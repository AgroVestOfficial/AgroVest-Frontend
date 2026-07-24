"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { formatEther } from "viem";
import { toast } from "sonner";
import useGetAllProposals from "@/hooks/ReadHooks/useGetAllProposals";
import useGetTokenBalance from "@/hooks/ReadHooks/useGetTokenBalance";
import useVoteProposal from "@/hooks/WriteHooks/useVoteProposal";
import { QueryLoader, QueryError } from "@/components/shared/QueryState";
import { ProposalType } from "@/utils/types";

// ── helpers ──────────────────────────────────────────────────────────────────

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function formatTimestamp(ts: bigint): string {
  if (ts === 0n) return "—";
  return new Date(Number(ts) * 1000).toLocaleDateString();
}

function proposalStatus(proposal: ProposalType): {
  label: string;
  className: string;
} {
  if (proposal.executed) {
    return { label: "Executed", className: "text-blue-600" };
  }
  const now = BigInt(Math.floor(Date.now() / 1000));
  if (proposal.executionTime > 0n && now > proposal.executionTime) {
    return { label: "Expired", className: "text-gray-500" };
  }
  return { label: "Active", className: "text-darkgreen font-semibold" };
}

// ── VoteModal ─────────────────────────────────────────────────────────────────

interface VoteModalProps {
  proposal: ProposalType;
  isOpen: boolean;
  onClose: () => void;
  tokenBalance: bigint | undefined;
}

const VoteModal = ({ proposal, isOpen, onClose, tokenBalance }: VoteModalProps) => {
  const [isVoting, setIsVoting] = useState(false);
  const voteProposal = useVoteProposal();

  const handleVote = async () => {
    setIsVoting(true);
    try {
      await voteProposal(proposal.proposalId);
      toast.success("Vote cast successfully!");
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to cast vote.";
      toast.error(message);
    } finally {
      setIsVoting(false);
    }
  };

  const votingPower =
    tokenBalance !== undefined
      ? Math.floor(Math.sqrt(Number(formatEther(tokenBalance))))
      : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        <ModalHeader className="text-darkgreen">Vote on Proposal</ModalHeader>
        <ModalBody className="flex flex-col gap-3">
          <p className="font-medium text-gray-800">{proposal.title}</p>
          <p className="text-sm text-gray-600">{proposal.description}</p>

          <div className="mt-2 rounded-md bg-gray-100 p-3 text-sm">
            <p className="text-gray-500">
              Proposer:{" "}
              <span className="font-medium text-gray-800">
                {shortenAddress(proposal.proposer)}
              </span>
            </p>
            <p className="text-gray-500">
              Deadline:{" "}
              <span className="font-medium text-gray-800">
                {formatTimestamp(proposal.executionTime)}
              </span>
            </p>
          </div>

          {votingPower !== null ? (
            <p className="text-sm text-gray-600">
              Your estimated voting power:{" "}
              <span className="font-semibold text-darkgreen">{votingPower}</span>
              <span className="ml-1 text-xs text-gray-400">
                (√ of token balance)
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              Connect your wallet to see your voting power.
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose} disabled={isVoting}>
            Cancel
          </Button>
          <Button
            className="rounded-[7px] bg-darkgreen text-lightgreen"
            onPress={handleVote}
            isLoading={isVoting}
            disabled={isVoting}
          >
            Cast Vote
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// ── DAO (main) ────────────────────────────────────────────────────────────────

const DAO = () => {
  const { data: proposals, isLoading, isError, refetch } = useGetAllProposals();
  const { data: tokenBalance } = useGetTokenBalance();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProposal, setSelectedProposal] = useState<ProposalType | null>(null);

  const handleOpenVoteModal = (proposal: ProposalType) => {
    setSelectedProposal(proposal);
    onOpen();
  };

  // ── derived stats ──────────────────────────────────────────────────────────
  const totalProposals = proposals?.length ?? 0;

  const lockedFunds =
    tokenBalance !== undefined
      ? Number(formatEther(tokenBalance)).toFixed(2)
      : "—";

  const activeProposals = proposals
    ? proposals.filter((p: ProposalType) => {
        if (p.executed) return false;
        const now = BigInt(Math.floor(Date.now() / 1000));
        return p.executionTime === 0n || now <= p.executionTime;
      }).length
    : 0;

  const executedProposals = proposals
    ? proposals.filter((p: ProposalType) => p.executed).length
    : 0;

  const stats = [
    { title: "Total Proposals", value: isLoading ? "…" : totalProposals },
    { title: "Locked Funds", value: isLoading ? "…" : lockedFunds },
    { title: "Active Proposals", value: isLoading ? "…" : activeProposals },
    { title: "Executed Proposals", value: isLoading ? "…" : executedProposals },
  ];

  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-medium uppercase text-darkgreen md:text-xl">
        Governance
      </h1>

      {/* Stats bar */}
      <main className="grid w-full gap-4 bg-gray-100 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3"
          >
            <h4 className="font-light text-gray-800">{stat.title}</h4>
            {isLoading ? (
              <QueryLoader className="h-8 w-16" />
            ) : (
              <h1 className="text-2xl font-semibold text-darkgreen">{stat.value}</h1>
            )}
          </div>
        ))}

        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <Button
            className="rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
            onPress={() => refetch()}
          >
            Get Involved
          </Button>
        </div>
      </main>

      {/* Proposals table */}
      <main className="flex w-full flex-col gap-4 rounded-[5px] bg-gray-100 p-4">
        <h2 className="text-center text-lg font-medium uppercase text-gray-700">
          Recent Proposals
        </h2>

        {isError && (
          <QueryError message="Failed to load proposals. Please try again." />
        )}

        {isLoading ? (
          <div className="flex flex-col gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={`skeleton-${i}`}>
                <QueryLoader className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="text-gray-800">
                <TableHead className="text-start">Title</TableHead>
                <TableHead>Proposer</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!proposals || proposals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No proposals yet
                  </TableCell>
                </TableRow>
              ) : (
                proposals.map((proposal: ProposalType) => {
                  const { label, className } = proposalStatus(proposal);
                  return (
                    <TableRow key={proposal.proposalId.toString()}>
                      <TableCell className="font-medium text-gray-800">
                        {proposal.title}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {shortenAddress(proposal.proposer)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatTimestamp(proposal.createdAt)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatTimestamp(proposal.executionTime)}
                      </TableCell>
                      <TableCell className={`text-center ${className}`}>
                        {label}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          className="rounded-[5px] bg-darkgreen text-lightgreen"
                          onPress={() => handleOpenVoteModal(proposal)}
                          disabled={proposal.executed}
                        >
                          Vote
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </main>

      {/* Vote modal */}
      {selectedProposal && (
        <VoteModal
          proposal={selectedProposal}
          isOpen={isOpen}
          onClose={onClose}
          tokenBalance={tokenBalance}
        />
      )}
    </section>
  );
};

export default DAO;
