import { useState, useEffect } from "react";
import { getFeedbacks } from "../db/dbFunctions";
import Card from "react-bootstrap/Card";

export default function FeedbackReview() {
  const [feedback, setFeedback] = useState();

  useEffect(() => {
    getFeedbacks().then((r) => {
      setFeedback(r);
    });
  }, []);

  return (
    <div>
      {feedback
        ? feedback.map((item) => (
            <Card key={item.id}>
              <Card.Body>
                <Card.Title>{item.Name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.email}
                </Card.Subtitle>
                <Card.Text>{item.feedback}</Card.Text>
              </Card.Body>
            </Card>
          ))
        : ""}
    </div>
  );
}
