import EmptyMemories from '@/components/EmptyMemories'
import Footer from '@/components/footer'
import HeroSection from '@/components/HeroSection'
import SignSection from '@/components/SignSection'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* Left Section */}
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
        {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-600 opacity-50 blur-full" />
        {/* Stripes */}
        <div className="absolute bottom-0 right-1 top-0 w-2 bg-stripes" />

        {/* Sign In */}
        <SignSection />
        {/* Hero */}
        <HeroSection />

        {/* Footer */}
        <Footer />
      </div>
      {/* Right Section */}
      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <EmptyMemories />
      </div>
    </main>
  )
}
