export type MessageType = 'success' | 'error';

interface FormMessageProps {
  type: MessageType;
  message: string;
}

export function FormMessage({ type, message }: FormMessageProps) {
  if (!message) return null;

  const styles = {
    success: 'text-green-500 bg-green-50',
    error: 'text-red-500 bg-red-50'
  };

  return (
    <div className={`mt-2 p-2 text-sm border rounded-md ${styles[type]}`}>
      {message}
    </div>
  );
}