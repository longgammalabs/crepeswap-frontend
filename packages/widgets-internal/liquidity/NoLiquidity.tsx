import { useTranslation } from "@iguanadex/localization";
import { Text } from "@iguanadex/uikit";

export function NoLiquidity() {
  const { t } = useTranslation();

  return (
    <Text color="textSubtle" textAlign="center">
      {t("No liquidity found.")}
    </Text>
  );
}
