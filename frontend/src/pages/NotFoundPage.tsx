import { useEffect, type FC } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "@/components";

export const NotFoundPage: FC = () => {
  useEffect(() => {
    document.title = "Page Not Found | Amani School";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-dark to-brand-dark">
      <Container className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-brand-green mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link to="/">
          <Button variant="primary" size="lg">
            Go Back Home
          </Button>
        </Link>
      </Container>
    </div>
  );
};
