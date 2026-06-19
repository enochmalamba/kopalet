import { Toaster } from "sonner";

export default function Sonner() {
  return (
    <Toaster
      position="bottom-center"
      visibleToasts={1}
      closeButton={false}
      expand={false}
      richColors={false}
      toastOptions={{
        duration: 2000,
        unstyled: true,
        classNames: {
          toast: "app-toast",
          title: "app-toast-title",
          description: "app-toast-description",
          success: "app-toast-success",
          error: "app-toast-error",
          warning: "app-toast-warning",
          info: "app-toast-info",
        },
      }}
    />
  );
}
