import React from 'react';
import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [reviews, setReview] = useState({ good: 0, neutral: 0, bad: 0 });

  const onLeaveFeedback = name => {
    const newReviews = { ...reviews, [name]: reviews[name] + 1 };
    setReview(newReviews);
  };

  const countTotalFeedback = () => {
    let total = reviews.good + reviews.neutral + reviews.bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    let total = countTotalFeedback();
    let positivePercentage = Math.ceil((reviews.good * 100) / total);
    return positivePercentage;
  };

  let total = countTotalFeedback();
  let positivePercentage = countPositiveFeedbackPercentage() || 0;
  let options = ['good', 'neutral', 'bad'];

  return (
    <div
      style={{
        height: '100vh',
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>

      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={reviews.good}
            neutral={reviews.neutral}
            bad={reviews.bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback !"></Notification>
        )}
      </Section>
    </div>
  );
};
