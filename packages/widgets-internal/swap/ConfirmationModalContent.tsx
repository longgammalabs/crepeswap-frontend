import { Box } from "@iguanadex/uikit";
import { styled } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

export function ConfirmationModalContent({
  bottomContent,
  topContent,
}: {
  topContent: () => React.ReactNode;
  bottomContent: () => React.ReactNode;
}) {
  return (
    <Wrapper>
      <Box>{topContent()}</Box>
      <Box>{bottomContent()}</Box>
    </Wrapper>
  );
}
