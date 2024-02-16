export default function Error({ message }: { message: string }) {
  return (
    <p className="text-red-500 text-lg font-semibold my-2 text-center">
      {message}
    </p>
  );
}
