import React from 'react';
import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = name => {
    if (name === 'good') {
      setGood(prevState => {
        return prevState + 1;
      });
    }
    if (name === 'neutral') {
      setNeutral(prevState => {
        return prevState + 1;
      });
    }
    if (name === 'bad') {
      setBad(prevState => {
        return prevState + 1;
      });
    }
  };

  const countTotalFeedback = () => {
    let total = good + neutral + bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    let total = countTotalFeedback();
    let positivePercentage = Math.ceil((good * 100) / total);
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
            good={good}
            neutral={neutral}
            bad={bad}
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
