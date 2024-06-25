import { CheckBadgeIcon } from "@heroicons/react/24/outline";

interface FormSuccessProps {
  message?: string;
};

export const FormSuccess = ({
  message,
}: FormSuccessProps) => {
  if (!message) return null;

  // Create an object for dangerouslySetInnerHTML
  const createMarkup = () => {
    return {__html: message};
  };

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckBadgeIcon className="h-4 w-4" />
      {/* Use dangerouslySetInnerHTML to render the message as HTML */}
      <p dangerouslySetInnerHTML={createMarkup()}></p>
    </div>
  );
};