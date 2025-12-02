"use client";
export default function Errors({ error }: { error: Error }) {
  return (
    <div className="flex justify-center items-center">
      <h1>SomeThing Went Wrong</h1>
      <p>{error.message}</p>
    </div>
  );
}
