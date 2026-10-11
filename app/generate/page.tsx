"use client";

import { useState } from "react";

import Header from "@/components/Generate/Header";
import GenerateIntro from "@/components/Generate/GenerateIntro";
import RepositorySourceSection from "@/components/Generate/RepositorySourceSection";
import RepositoryDetailsSection from "@/components/Generate/RepositoryDetailsSection";
import ReadmeStyleSection from "@/components/Generate/ReadmeStyleSection";
import GenerateButton from "@/components/Generate/GenerateButton";
import ReadmePreview from "@/components/Generate/ReadmePreview";

import type {
  ReadmeStyleValue,
  RepositorySourceValue,
} from "@/components/Generate/types";

export default function Generate() {
  const [selected, setSelected] = useState<RepositorySourceValue>("github");
  const [repoUrl, setRepoUrl] = useState("");
  const [repoDetails, setRepoDetails] = useState("");
  const [readmeStyle, setReadmeStyle] =
    useState<ReadmeStyleValue>("professional");

  const [file, setFile] = useState<File | null>(null);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="mx-auto grid max-w-360 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-h-screen border-r border-border bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgb(22_163_74/0.07),transparent)] px-5 py-10 sm:px-10 lg:py-14">
          <div className="mx-auto max-w-4xl space-y-8">
            <GenerateIntro />

            <RepositorySourceSection
              selected={selected}
              setSelected={setSelected}
              repoUrl={repoUrl}
              setRepoUrl={setRepoUrl}
              file={file}
              setFile={(file) => setFile(file)}
            />

            <RepositoryDetailsSection
              repoDetails={repoDetails}
              setRepoDetails={setRepoDetails}
            />

            <ReadmeStyleSection
              readmeStyle={readmeStyle}
              setReadmeStyle={setReadmeStyle}
            />

            <GenerateButton />
          </div>
        </div>

        <ReadmePreview />
      </section>
    </main>
  );
}
