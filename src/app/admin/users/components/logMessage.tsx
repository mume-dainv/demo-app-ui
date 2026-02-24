import React from 'react';

export default function LogMessage({ messages }: { messages: [] }) {
  const groupByRow = (messages: any[]) => {
    const result: Record<string, any[]> = {};

    messages.forEach((item) => {
      Object.entries(item).forEach(([row, fields]) => {
        if (!result[row]) result[row] = [];

        Object.entries(fields as Record<string, string[]>).forEach(([field, errors]) => {
          errors.forEach((msg) => {
            result[row].push({ field, msg });
          });
        });
      });
    });

    return result;
  };
  const res = groupByRow(messages as any);
  return (
    <div className="space-y-4">
      {Object.entries(groupByRow(messages)).map(([row, errors]) => (
        <div key={row} className="rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="font-bold text-red-700">{row}</p>

          <ul className="list-disc pl-5 text-red-600">
            {errors.map((e, i) => (
              <li key={i}>
                <strong>{e.field}</strong>: {e.msg}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
