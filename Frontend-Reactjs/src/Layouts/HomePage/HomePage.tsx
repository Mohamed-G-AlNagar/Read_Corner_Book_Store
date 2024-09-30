
import { BannerCarousel } from "./Components/BannerCarousel";
import { Carousel } from "./Components/Carousel";
import { Heros } from "./Components/Heros";
import { LibraryServices } from "./Components/LibraryServices";

export const HomePage = () => {

    return (
        <>
            <BannerCarousel/>
        <div className="container">
            <Carousel/>
            <Heros/>
            {/* <LibraryServices/> */}
        </div>
        </>
    );
}