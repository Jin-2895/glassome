import { FC } from "react";
import { Container } from "../../../ui";
import { FavoriteProducts } from "../FavoriteProducts/FavoriteProducts";
import { ProfileTabs } from "../ProfileTabs/ProfileTabs";

const Favorites: FC = () => {
  return (
    <Container className="py-50 px-12 lg:px-24 lg:py-100">
      <ProfileTabs />
      <FavoriteProducts />
    </Container>
  );
};

export { Favorites };
