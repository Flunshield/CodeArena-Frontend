import { useTranslation } from "react-i18next";
import { Container } from "../../../ComposantsCommun/Container";
import { FadeIn } from "../../../ComposantsCommun/FadeIn";
import { ItemList } from "../../../ComposantsCommun/ItemList";
import { List } from "../../../ComposantsCommun/List";
import { SectionIntro } from "../../../ComposantsCommun/SectionIntro";
import {DEV_PICTURE} from "../../../constantes/constanteEntreprise";

function Services() {
  const { t } = useTranslation();
    return (
      <>
        <SectionIntro
          title={t("homedevServiceTitle")}
          className="mt-24 sm:mt-32 lg:mt-40"
        >
          <p>
          {t("homedevServiceDescription")}
          </p>
          <p>
          {t("homedevServiceDescriptionBis")}
          </p>
        </SectionIntro>
        <Container className="mt-16">
          <div className="lg:flex lg:items-center lg:justify-end">
            <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            {DEV_PICTURE.map((dev, index) => (
             
              <FadeIn key={index} className="w-[33.75rem] flex items-center  lg:w-[45rem]">
              <img
                      src={dev.src}
                      alt={dev.alt}
                      className="rounded-full lg:w-auto lg:h-auto  items-center w-[16rem] h-[16rem]"
                    />
              </FadeIn>
            ))}
            </div>
            <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
              <ItemList  id="List" title={t("homedevServiceListTitle1")}>
                {t("homedevServiceList1")}
              </ItemList>
              <ItemList id="List" title={t("homedevServiceListTitle2")}>
                {t("homedevServiceList2")}
              </ItemList>
              <ItemList id="List" title={t("homedevServiceListTitle3")}>
                {t("homedevServiceList3")}
              </ItemList>
            </List>
          </div>
        </Container>
      </>
    )
  }

  export default Services