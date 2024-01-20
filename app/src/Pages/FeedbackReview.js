import { useState } from "react";
import { getFeedbacks } from "../db/dbFunctions";

export default function FeedbackReview() {
  const [feedback, setFeedback] = useState();

  getFeedbacks().then((r) => setFeedback(r));
  return (
    <div>
      {feedback
        ? feedback.map((item) => (
            <>
              <p>{item.Name}</p>
              <p>{item.email}</p>

              <p>{item.feedback}</p>
              <p>///////////////////////////////////////</p>
            </>
          ))
        : ""}
    </div>
  );
}
