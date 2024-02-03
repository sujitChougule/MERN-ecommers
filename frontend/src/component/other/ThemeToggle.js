//Toggle.js

import {
  VStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { BsSun, BsMoon } from "react-icons/bs";

function ThemeToggle() {
  // Chakra UI hook that toggle the color mode
  const { toggleColorMode } = useColorMode();
  return (
    <VStack>
      {useColorModeValue()}
      <IconButton
        aria-label="Mode Change"
        variant="outline"
        colorScheme="black"
        size="lg"
        icon={useColorModeValue(<BsMoon />, <BsSun />)}
        onClick={toggleColorMode}
      />
    </VStack>
  );
}

export default ThemeToggle;
