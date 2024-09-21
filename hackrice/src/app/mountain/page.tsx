'use client'
import { useRouter } from "next/navigation";
import Scene from "../../../components/Scene";
export default function Page() {
  const router = useRouter();
  // const { goal } = router.query;
  return (
    <main className="h-full">
      <Scene />
    </main>
  );
}
