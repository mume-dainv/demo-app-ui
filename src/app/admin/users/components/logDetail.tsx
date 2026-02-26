import React from 'react';

export default function LogDetail({ log, nextState }: { log: any; nextState: Function }) {
  return (
    <div>
      <button onClick={() => nextState()}>case</button>
    </div>
  );
}
