import { SignIn } from "@clerk/nextjs";

type SignPageProps = {
  searchParams: {
    redirectUrl: string;
  };
};

export default function SignInPage({ searchParams: { redirectUrl }}: SignPageProps) {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <SignIn 
            signUpUrl="/sign-up"
            redirectUrl={redirectUrl}
          />
        </div>
      </div>
    </section>
  )
}