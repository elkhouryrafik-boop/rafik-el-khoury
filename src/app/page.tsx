import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { EarlierWork } from "@/components/EarlierWork";
import { Contact } from "@/components/Contact";
import { Colophon } from "@/components/Colophon";
import { Cursor } from "@/components/Cursor";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <About />
        <EarlierWork />
        <Contact />
        <Colophon />
      </main>
    </>
  );
}
