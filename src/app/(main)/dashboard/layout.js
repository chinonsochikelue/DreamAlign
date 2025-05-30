// import { BarLoader } from "react-spinners";
import { Suspense } from "react";
import { Loader } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="md:text-6xl text-5xl font-bold gradient-title">Industry Insights</h1>
      </div>
      <Suspense
        fallback={<Loader className="mt-4" width={"100%"} color="gray" />}
      >
        {children}
      </Suspense>
    </div>
  );
}
