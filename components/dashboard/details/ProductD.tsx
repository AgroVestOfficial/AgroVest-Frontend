"use client";
import Image from "next/image";
import React, { FormEvent, useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import avatar from "@/public/avatar.png";
// import useGetAllFarmProducts from "@/hooks/ReadHooks/useGetAllFarmProducts";
import useGetFarmProductByAddress from "@/hooks/ReadHooks/useGetFarmProductByAddress";
import { formatEther } from "viem";
import useGetProductReview from "@/hooks/ReadHooks/useGetProductReview";
import { toast } from "sonner";
import useAddProductToCart from "@/hooks/WriteHooks/useAddProductToCart";
import useSubmitReview from "@/hooks/WriteHooks/useSubmitReview";
import { ProductType, ReviewType } from "@/utils/types";
import { useAccount } from "wagmi";

const ProductD = ({ id }: { id: string }) => {
  // Hook calls
  const address = useAccount();
  const { data: products } = useGetFarmProductByAddress(address);
  const { data: reviews } = useGetProductReview(Number(id));
  const addProductToCart = useAddProductToCart();
  const submitReview = useSubmitReview();

  const [currentData, setCurrentData] = useState<ProductType>();

  useMemo(() => {
    const farmDetail = products?.find(
      (product: ProductType) => Number(product.product_id) === Number(id)
    );
    setCurrentData(farmDetail);
  }, [id, products]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [review, setReview] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await submitReview(Number(id), review);
      toast.dismiss();
      toast.success("Review Submitted Successfully");
    } catch (err) {
      toast.dismiss();
      toast.error("Error submitting review. Please try again.");
      console.error(err);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addProductToCart(Number(id));
      toast.dismiss();
      toast.success("Product added to cart successfully!");
    } catch (err) {
      toast.dismiss();
      toast.error("Error adding product to cart. Please try again.");
      console.error(err);
    }
  };

  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">
        Product Detail
      </h1>

      <main className="grid w-full bg-gray-100 md:grid-cols-2">
        <div className="h-[250px] w-full md:h-[350px]">
          <Image
            src={`https://gateway.pinata.cloud/ipfs/${currentData?.product_image}`}
            alt="productImage"
            width={640}
            height={427}
            quality={100}
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-4 px-8 py-8">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-700">{currentData?.product_name}</h2>
            <p className="text-gray-600">
              {currentData && currentData.product_price && (
                <span>
                  {formatEther(BigInt(currentData.product_price))}{" "}
                  <span className="font-semibold">ETH</span>
                </span>
              )}
            </p>{" "}
          </div>
          <p className="text-gray-600">{currentData?.product_description}</p>
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-gray-600">Quantity</p>
            <div className="flex">
              <button
                className="flex h-8 w-8 items-center justify-center rounded bg-darkgreen text-base text-gray-200 md:h-10 md:w-10"
                onClick={handleDecrement}
              >
                <FaMinus />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="h-10 w-10 rounded border-[0.5px] border-gray-400 text-center font-medium text-gray-700"
              />
              <button
                className="flex h-8 w-8 items-center justify-center rounded bg-darkgreen text-base text-gray-200 md:h-10 md:w-10"
                onClick={handleIncrement}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <Button
            type="button"
            className="mt-3 rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
            onClick={() => handleAddToCart()}
          >
            Add to cart
          </Button>
        </div>
      </main>

      {/* Reviews */}
      <main className="flex w-full flex-col gap-8 bg-gray-100 px-8 py-8">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">Product Reviews</h2>
          <Button
            onPress={onOpen}
            className="rounded-[5px] bg-darkgreen px-6 py-2.5 text-sm text-gray-200"
          >
            Submit Review
          </Button>
        </div>

        <section className="flex w-full flex-col gap-4">
          {reviews?.map((review: ReviewType, index: number) => (
            <div
              key={index}
              className="flex w-full flex-col items-start justify-start gap-3 rounded bg-gray-50 p-4 md:flex-row md:gap-6"
            >
              <div className="h-[50px] w-[50px] md:h-[70px] md:w-[70px]">
                <Image
                  src={avatar}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                  quality={100}
                  priority
                />
              </div>
              <article className="flex-1">
                <p className="text-gray-600">{review.review}</p>
              </article>
            </div>
          ))}
        </section>
      </main>

      {/* modal  */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 capitalize text-gray-800">
                Review Product
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4 py-3">
                <form className="grid w-full gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <label htmlFor="productName" className="ml-1 font-medium text-gray-700">
                      Review
                    </label>
                    <textarea
                      name="review"
                      id="review"
                      placeholder="Write your review..."
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      required
                    ></textarea>
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

export default ProductD;
