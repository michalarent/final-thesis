import { motion } from "framer-motion";
import styled from "styled-components";
import { ArentFlex } from "../ui/navigation/layout/ArentGrid";

const Container = styled.div`
  border-radius: 10px;
  position: relative;
  padding: 20px;
  width: 100%;
  height: 180px;
  background-color: #f5f5f5;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  dispay: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    & p {
      text-decoration: underline;
    }
  }
`;

export default function AddedFormItem({ item }) {
  return (
    <motion.div
      style={{ width: "100%" }}
      key={`${item.stepNumber}-form-item`}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Container>
        <ArentFlex direction="column" justify="space-between" height="100%">
          <ArentFlex direction="column" gap={10} width="100%">
            <h5>{item.inputs.title}</h5>
            <p>{item.inputs.description}</p>
            <ArentFlex
              gap={5}
              justify="start"
              style={{
                overflow: "auto",
                maxHeight: "40px",
                paddingBottom: 20,
                flexWrap: "wrap",
              }}
            >
              {item.type === "Select" && (
                <>
                  {item.inputs.options.map((option, index) => (
                    <>
                      <motion.span
                        key={index + "select-option"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          fontSize: 12,
                          padding: "5px 10px",
                          border: "1px solid gray",
                          background: "white",
                          borderRadius: 5,
                          flexGrow: 1,
                        }}
                      >
                        {option}
                      </motion.span>
                      {index % 3 === 0 && index !== 0 && (
                        <br style={{ flexBasis: "100%", height: 0 }} />
                      )}
                    </>
                  ))}
                </>
              )}
            </ArentFlex>
          </ArentFlex>
          <p>{item.type} input</p>
        </ArentFlex>
      </Container>
    </motion.div>
  );
}
