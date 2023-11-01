import { SignUp } from "@clerk/nextjs";

type SignUpPageProps = {
  serachParams: {
    redirectUrl: string;
  };
};

export default function SignUpInPage({ serachParams: { redirectUrl }}: SignUpPageProps) {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <SignUp
            signInUrl="/sign-in"
            redirectUrl={redirectUrl}
          />
        </div>
      </div>
    </section>
  )
  }