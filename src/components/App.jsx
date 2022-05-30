import { useState } from 'react';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics'

const options = ['good', 'neutral', 'bad']

const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  })

  const handleClick = item => {
    setState(prevState => {
      return {...prevState, [item]: prevState[item] + 1,}
    });
  };

  const countTotalFeedback = () => {
    const items = Object.values(state);
    const total = items.reduce((acc, item) => (item += acc), 0);
    return total;
  }

  const countPositiveFeedbackPercentage = () => {
    const percentage = Math.round(
      (state.good * 100) / countTotalFeedback(),
    );

    return percentage;
  };
  
  const { good, neutral, bad } = state;
  const positivePercentage = countPositiveFeedbackPercentage();
  const total = countTotalFeedback();
    return (
    <>
      <Section title="Please leave feedback">
          <FeedbackOptions options={options} onLeaveFeedback={handleClick}/>
      </Section>
      
      <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage ? positivePercentage : 0}
          />
      </Section> 
    </>);
};

export default App;