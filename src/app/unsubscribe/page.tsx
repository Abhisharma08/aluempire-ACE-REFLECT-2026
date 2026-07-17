import { unsubscribeAction } from "@/app/actions/unsubscribe";
import { ShieldCheck, MailX, AlertCircle } from "lucide-react";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const token = resolvedParams.token as string;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center p-8 border border-gray-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h1>
          <p className="text-gray-500 mb-8">
            This unsubscribe link is invalid or has expired. Please check the link in your email and try again.
          </p>
        </div>
      </div>
    );
  }

  // Automatically attempt to unsubscribe using the token
  const result = await unsubscribeAction(token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center p-8 border border-gray-100">
        
        {result.success || result.alreadyUnsubscribed ? (
          <>
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Unsubscribed Successfully</h1>
            <p className="text-gray-500 mb-6">
              {result.alreadyUnsubscribed 
                ? "You have already been unsubscribed from our mailing list."
                : "You have been successfully removed from our mailing list and will no longer receive automated follow-ups."}
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 border border-gray-100">
              If you did this by mistake, please reply to your previous email to let us know.
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <MailX className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-500 mb-6">
              {result.error || "We couldn't process your request. Please try again later."}
            </p>
          </>
        )}

      </div>
    </div>
  );
}
