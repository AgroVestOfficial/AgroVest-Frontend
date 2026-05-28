/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { farmData, FarmDataType } from "@/utils/products";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React, { FormEvent, useMemo, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FarmInvestmentD = ({ id }: { id: string }) => {
  const [currentData, setCurrentData] = useState<FarmDataType[]>([]);

  useMemo(() => {
    const farmDetail = farmData.filter((farm) => farm.id === Number(id));
    setCurrentData(farmDetail);
  }, [id]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Uplaod to IPFS and return of the URI
  const [selectedFile, setSelectedFile] = useState<any>();

  const handleSelectImage = ({ target }: { target: any }) => {
    setSelectedFile(target.files[0]);
  };

  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">Farm Owner</h1>

      <main className="grid w-full gap-4 bg-gray-100 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Funding Target</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">{currentData[0]?.fundsTarget}</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Funds Raised</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">{currentData[0]?.amountRaised}</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Investors</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">{currentData[0]?.investors}</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <Button
            onPress={onOpen}
            className="rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
          >
            Edit Profile
          </Button>
        </div>
      </main>

      <main className="grid w-full bg-gray-200 md:h-[400px] md:grid-cols-2">
        <div className="h-full w-full">
          <Image
            src={currentData[0]?.imageUrl}
            alt={currentData[0]?.altText}
            width={2480}
            height={1360}
            quality={100}
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-4 px-8 pb-4 pt-8 md:pb-0">
          <h2 className="text-2xl font-semibold text-gray-700">{currentData[0]?.name}</h2>
          <p className="text-gray-600">{currentData[0]?.description}</p>
          <div className="flex w-full flex-col gap-4 border-t border-gray-700 py-5">
            <p className="flex items-center gap-1.5 text-gray-600">
              <FaLocationDot />
              {currentData[0]?.address}
            </p>
            <p className="flex items-center gap-1.5 text-gray-600">
              <IoLogoWhatsapp />
              {currentData[0]?.phoneNumber}
            </p>
            <p className="flex items-center gap-1.5 text-gray-600">
              <MdEmail />
              {currentData[0]?.email}
            </p>
          </div>
        </div>
      </main>

      {/* table  */}
      <main className="flex w-full flex-col gap-4 rounded-[5px] bg-gray-100 p-4">
        <h2 className="text-start text-lg font-medium uppercase text-gray-700">
          Investor Listings
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="text-gray-800">
              <TableHead className="text-start">Investor Address</TableHead>
              <TableHead>Fund&apos;s Target</TableHead>
              <TableHead>Farm ID</TableHead>
              <TableHead>Amount Deposited</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData[0]?.fundingDetails.map((farm, index) => (
              <TableRow key={index} className="text-gray-600">
                <TableCell className="text-start font-medium">{farm.farmName}</TableCell>
                <TableCell>{farm.fundsTarget}</TableCell>
                <TableCell>{farm.investors}</TableCell>
                <TableCell>{farm.amountRaised}</TableCell>
                <TableCell>{farm.balance}</TableCell>
                <TableCell className="text-center">{farm.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>

      {/* modal  */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 capitalize text-gray-800">
                Edit Farm Profile
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4 py-3">
                <form className="grid w-full gap-4" onSubmit={handleSubmit}>
                  <div className="flex w-full flex-col items-center">
                    <div className="relative h-[80px] w-[80px] rounded border-[0.5px] border-darkgreen">
                      {selectedFile ? (
                        <Image
                          src={URL.createObjectURL(selectedFile)}
                          alt="profile"
                          className="h-full w-full object-cover"
                          width={440}
                          height={440}
                          priority
                          quality={100}
                        />
                      ) : (
                        <span className="relative flex h-full w-full items-center justify-center text-darkgreen">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="relative inline-flex size-6 rounded text-6xl text-gray-300"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                            />
                          </svg>
                        </span>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        className="hidden"
                        id="selectFile"
                        onChange={handleSelectImage}
                      />
                      <label
                        htmlFor="selectFile"
                        className="font-Bebas absolute -bottom-1 -right-1 cursor-pointer rounded-full border-[0.5px] border-gray-700/50 bg-darkgreen p-1 tracking-wider text-gray-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="productName" className="ml-1 font-medium text-gray-700">
                      Farm Name
                    </label>
                    <input
                      type="text"
                      name="productName"
                      id="productName"
                      placeholder="Enter product name"
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="productImg" className="ml-1 font-medium text-gray-700">
                      Farm Image URI
                    </label>
                    <input
                      type="text"
                      name="productImg"
                      id="productImg"
                      placeholder="Product Image URI"
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={productImage}
                      onChange={(e: any) => setProductImage(e.target.value)}
                      readOnly
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="productDesc" className="ml-1 font-medium text-gray-700">
                      Farm Description
                    </label>
                    <input
                      type="text"
                      name="productDesc"
                      id="productDesc"
                      placeholder="Enter product description"
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={productDesc}
                      onChange={(e) => setProductDesc(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="productPrice" className="ml-1 font-medium text-gray-700">
                      Product Price
                    </label>
                    <input
                      type="text"
                      name="productPrice"
                      id="productPrice"
                      placeholder="Enter product price"
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="mt-3 rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
                  >
                    Submit
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default FarmInvestmentD;
