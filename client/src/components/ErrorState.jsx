import { Button } from "@/components/ui/button";

export default function ErrorState({
  title = "Something went wrong",
  message = "Unable to load data. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h3 className="text-xl font-semibold text-gray-900">
        {title}
      </h3>
      <p className="text-gray-600 mt-2 max-w-md">
        {message}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          className="mt-6"
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
