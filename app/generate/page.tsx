"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Header from "@/features/readme-generator/components/Generate/Header";
import GenerateIntro from "@/features/readme-generator/components/Generate/GenerateIntro";
import RepositorySourceSection from "@/features/readme-generator/components/Generate/RepositorySourceSection";
import RepositoryDetailsSection from "@/features/readme-generator/components/Generate/RepositoryDetailsSection";
import ReadmeStyleSection from "@/features/readme-generator/components/Generate/ReadmeStyleSection";
import GenerateButton from "@/features/readme-generator/components/Generate/GenerateButton";
import ReadmePreview from "@/features/readme-generator/components/Generate/ReadmePreview";

import {
  useGenerateReadmeURL,
  useGenerateReadmeLocal,
} from "@/features/readme-generator/hooks/useGenerateReadme";

import type {
  ReadmeStyleValue,
  RepositorySourceValue,
} from "@/features/readme-generator/types/types";

export default function Generate() {
  
  const [selected, setSelected] = useState<RepositorySourceValue>("github");
  const [repoUrl, setRepoUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [repoDetails, setRepoDetails] = useState("");
  const [readmeStyle, setReadmeStyle] = useState<ReadmeStyleValue>("professional");

  const [file, setFile] = useState<File | null>(null);
  const [readme, setReadme] = useState("");

  useEffect(() => {
    setRepoUrl(localStorage.getItem("repoUrl") || "");
  }, []);

  const {
    mutateAsync: urlMutation,
    isPending: isUrlPending,
  } = useGenerateReadmeURL();

  const {
    mutateAsync: localMutation,
    isPending: isLocalPending,
  } = useGenerateReadmeLocal();

  async function generateReadme() {
    try {
      if (!readmeStyle) return;

      if (selected === "github") {
        if (!repoUrl.trim()) {
          return toast.error("Provide the URL");
        }

        if (!isValidUrl) {
          return toast.error("Please verify the Url");
        }

        const data = await urlMutation({
          repoUrl,
          readmeStyle,
          repoDetails,
        });

        setReadme(data);
      } else if (selected === "local") {
        if (!file) {
          return toast.error("No file provided!");
        }

        const data = await localMutation({
          zipFile: file,
          readmeStyle,
          repoDetails,
        });

        setReadme(data);
      }
    } catch (error) {
      console.error("Failed to generate README:", error);
    }
  }

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
              setFile={setFile}
              isValidUrl={isValidUrl}
              setIsValidUrl={setIsValidUrl}
            />

            <RepositoryDetailsSection
              repoDetails={repoDetails}
              setRepoDetails={setRepoDetails}
            />

            <ReadmeStyleSection
              readmeStyle={readmeStyle}
              setReadmeStyle={setReadmeStyle}
            />

            <GenerateButton onClick={generateReadme} />
          </div>
        </div>

        {/* README preview */}
        <ReadmePreview />
      </section>
    </main>
  );
}