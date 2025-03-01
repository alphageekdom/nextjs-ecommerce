"use client";

import { useState } from "react";
import { Review } from "@/types";
import Link from "next/link";
import ReviewForm from "./review-form";

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <div className="space-y-4">
      {reviews.length === 0 && <div>No reviews yet</div>}

      {userId ? (
        <ReviewForm userId={userId} productId={productId} />
      ) : (
        <div className="review-text">
          Please{" "}
          <Link
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
            className="text-blue-700 hover:underline"
          >
            sign in{" "}
          </Link>
          to write a review.
        </div>
      )}
      <div className="flex flex-col gap-3">{/* REVIEWS HERE */}</div>
    </div>
  );
};

export default ReviewList;
