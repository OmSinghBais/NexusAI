import Link from "next/link";
import { Button } from "@aios/ui";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />

      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            AI Operating System
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Enterprise SaaS Platform for Multi-Agent Workflows.
            Deploy autonomous AI employees that collaborate to automate your business.
          </p>
        </div>

        <div className="flex gap-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/login">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 bg-background/50 backdrop-blur-sm">
            <Link href="/dashboard">View Demo</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
