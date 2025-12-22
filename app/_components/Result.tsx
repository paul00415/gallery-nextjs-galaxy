"use client";
// Importing the resetState action creator from the CounterSlice.
import { resetState } from "@/lib/features/CounteState/CounterSlice";
import { useDispatch } from "react-redux";

export default function ResetButton() {
// Initializing the dispatch function to dispatch actions to the Redux store.
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex flex-col items-center border p-10">
        <button
          onClick={() => dispatch(resetState())}
          className=" w-40 h-10 border rounded bg-red-300 px-4 text-gray-600 font-semibold"
        >
          Reset Counter
        </button>
      </div>
    </div>
  );
}