// components/typography.jsx

export function H1({ children, className = "" }) {
  return (
    <h1
      className={`scroll-m-20 text-3xl font-bold tracking-tight lg:text-3xl ${className}`}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className = "" }) {
  return (
    <h2
      className={`scroll-m-20 border-b pb-2 text-3xl tracking-tight first:mt-0 ${className}`}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className = "" }) {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className = "" }) {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h4>
  );
}

export function P({ children, className = "" }) {
  return (
    <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>
      {children}
    </p>
  );
}

export function Blockquote({ children, className = "" }) {
  return (
    <blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`}>
      {children}
    </blockquote>
  );
}

export function InlineCode({ children, className = "" }) {
  return (
    <code
      className={`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}
    >
      {children}
    </code>
  );
}

export function Lead({ children, className = "" }) {
  return (
    <p className={`text-xl text-muted-foreground ${className}`}>{children}</p>
  );
}

export function Large({ children, className = "" }) {
  return <div className={`text-lg font-semibold ${className}`}>{children}</div>;
}

export function Small({ children, className = "" }) {
  return (
    <small className={`text-sm font-medium leading-none ${className}`}>
      {children}
    </small>
  );
}

export function Muted({ children, className = "" }) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
  );
}

export function List({ children, className = "" }) {
  return (
    <ul className={`my-6 ml-6 list-disc [&>li]:mt-2 ${className}`}>
      {children}
    </ul>
  );
}

export function Table({ children, className = "" }) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className={`w-full ${className}`}>{children}</table>
    </div>
  );
}

export function TableHeader({ children, className = "" }) {
  return <thead className={className}>{children}</thead>;
}

export function TableBody({ children, className = "" }) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, className = "" }) {
  return (
    <tr className={`m-0 border-t p-0 even:bg-muted ${className}`}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className = "" }) {
  return (
    <th
      className={`border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right ${className}`}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className = "" }) {
  return (
    <td
      className={`border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right ${className}`}
    >
      {children}
    </td>
  );
}
