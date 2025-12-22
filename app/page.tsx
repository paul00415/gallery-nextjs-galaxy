import Counter from './_components/Counter';
import ResetButton from './_components/ResetButton';
import Result from './_components/Result';
import { Button } from '@heroui/button';

export default function Gallery() {
  return (
    <div className="w-screen flex flex-col gap-10 mt-10 items-center">
      <h1 className="text-center font-bold text-2xl text-gray-600">
        Redux Counter
      </h1>
      <div className="flex flex-col gap-4 items-center">
        <Counter />
        <Result />
      </div>
      <ResetButton />
      <Button>Hello</Button>
    </div>
  );
}
