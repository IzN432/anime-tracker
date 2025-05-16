import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ApolloProviderWrapper>
        <body>{children}</body>
      </ApolloProviderWrapper>
    </html>
  );
}
