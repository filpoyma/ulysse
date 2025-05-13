import React, { useRef, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { DetailsSection } from "../components/DetailsSection";
import ImageUploadModal from "../components/ImageUploadModal/ImageUploadModal";
import FirstPage from "../components/FirstPage";
import { useSelector } from "react-redux";
import { travelProgramService } from "../services/travelProgram.service";
import { RootState } from "../store";
import { ROOT_URL } from "../constants/api.constants";
import { IFirstPageData as FirstPageType } from "../types/travelProgram.types";

const DEFAULT_FIRST_PAGE: FirstPageType = {
  title: "",
  subtitle: "",
  footer: "",
};

const TravelProgram: React.FC = () => {
  const { programName } = useParams();
  const detailsRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [currentSection, setCurrentSection] = useState("hero");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageNumber, setSelectedImageNumber] = useState<number | null>(
    0
  );

  const program = useSelector(
    (state: RootState) => state.travelProgram.program
  );
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const firstPage: FirstPageType = program?.firstPage || DEFAULT_FIRST_PAGE;

  useEffect(() => {
    if (programName) {
      travelProgramService.getByName(programName);
    }
  }, [programName]);

  const handleUpdateFirstPage = useCallback(
    async (values: FirstPageType) => {
      if (!programName) return;
      await travelProgramService.updateFirstPage(programName, values);
    },
    [programName]
  );

  const scrollToDetails = useCallback(() => {
    detailsRef.current?.scrollIntoView({ behavior: "smooth" });
    setCurrentSection("details");
  }, []);

  useEffect(() => {
    const rightSide = document.querySelector(".right-side");
    if (!rightSide) return;

    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      const detailsSection = document.getElementById("details");

      if (!heroSection || !detailsSection) return;

      const heroRect = heroSection.getBoundingClientRect();
      const detailsRect = detailsSection.getBoundingClientRect();
      const headerHeight = 80;

      if (detailsRect.top <= headerHeight + 100) {
        setCurrentSection("details");
        setSelectedImageNumber(1);
      } else if (heroRect.top >= -100) {
        setSelectedImageNumber(0);
        setCurrentSection("hero");
      }
    };

    rightSide.addEventListener("scroll", handleScroll);
    return () => rightSide.removeEventListener("scroll", handleScroll);
  }, []);

  const firstPageBg = program?.bgImages?.[0]?.path
    ? `${ROOT_URL}/${program.bgImages[0].path.replace(/^\//, "")}`
    : "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1920";

  const secondPageBg = program?.bgImages?.[1]?.path
    ? `${ROOT_URL}/${program.bgImages[1].path.replace(/^\//, "")}`
    : "https://images.pexels.com/photos/4577791/pexels-photo-4577791.jpeg?auto=compress&cs=tinysrgb&w=1920";

  return (
    <>
      <Header
        currentSection={currentSection}
        navRef={navRef}
        scrollToDetails={scrollToDetails}
      />
      <ImageUploadModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programName={programName}
        imageNumber={selectedImageNumber}
      />
      <div className="page-container">
        <div className="left-side" style={{ cursor: "pointer" }}>
          <div
            className={`background-image ${
              currentSection === "hero" ? "active" : ""
            }`}
          >
            <img
              src={firstPageBg}
              alt="Leopard in tree"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <div
            className={`background-image ${
              currentSection === "details" ? "active" : ""
            }`}
          >
            <img
              src={secondPageBg}
              alt="Safari landscape"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
        <div className="right-side">
          <FirstPage
            firstPage={firstPage}
            isLoggedIn={isLoggedIn}
            onUpdate={handleUpdateFirstPage}
            onScrollToDetails={scrollToDetails}
          />
          <DetailsSection ref={detailsRef} />
        </div>
      </div>
    </>
  );
};

export default TravelProgram;
