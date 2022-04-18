import { BiMenu } from "react-icons/bi";
import { Draggable } from "react-beautiful-dnd";

export const OrderAnswer = ({
  answer,
  id,
  index,
  onDropAnswer,
  questionType,
  isDrop,
}) => {
  return (
    <Draggable index={index} draggableId={id}>
      {(provided) => (
        <tr
          className={`border border-2`}
          // ${isDrop && "change-re-order-answer"}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <td>
            <BiMenu size={35} />
            {answer.text}
          </td>
        </tr>
      )}
    </Draggable>
  );
};
