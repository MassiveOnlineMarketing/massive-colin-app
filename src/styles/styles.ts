export const constants = {
  glassStroke: "glass-border-gradient relative",
  glassFill: " backdrop-blur-[7px] bg-gradient-to-b from-[#fff]/60 to-[#fff]/50",

  darkStroke: "dark-glass-border-gradient relative",
  darkFill: "backdrop-blur-[7px] bg-gradient-to-b from-[#1F29371A]/60 to-[#1F29371A]/50",

  glassFill2: "bg-gradient-to-b from-[#fff]/60 to-[#fff]/50",
}

const container = {
  maxWidth: 'max-w-[1300px] mx-auto px-4 ',
  maxWidtht: 'max-w-[1300px] mx-auto  ',
  gutter: 'px-4 ',
}

export const styles = {
  glass: `${constants.glassStroke} ${constants.glassFill} shadow-md`,
  darkGlass: `${constants.darkStroke} ${constants.darkFill} shadow-md`,


}



export default container