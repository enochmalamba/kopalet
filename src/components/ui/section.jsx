export default function Section({ children, className = "", ...props }) {
  return (
    <section
      className={`w-full flex flex-col py-4 justify-start px-4 md:px-5 lg:px-[max(1.25rem,calc((100vw-1200px)/2))] ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
