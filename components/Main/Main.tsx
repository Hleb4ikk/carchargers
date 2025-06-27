export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="grow">
      <div className="max-w-[1440px] mx-auto p-4">{children}</div>
    </main>
  );
}
