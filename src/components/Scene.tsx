import { useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { useSidebarContext } from "../context/sidebarContext";
import { ActionButton, Link, Media, Message } from "./ChatBotUi";

interface SceneProps {
  data: any; // Replace 'any' with the actual type of 'data' if known
  isConnectable: boolean;
  selected: boolean;
  id: string;
}

interface ITemplate {
  id: string;
  content: any[];
}

const Scene: React.FC<SceneProps> = ({ isConnectable, selected, id }) => {
  const { toggleForm, flow } = useSidebarContext();
  const template: ITemplate | undefined = flow.find((value) => value.id === id);
  const [content, setContent] = useState(template ? [...template.content] : []);

  const renderElement = (
    actionType: string,
    messageContent: string,
    conditions: string[] | undefined,
    parentId: string
  ) => {
    switch (actionType) {
      case "textMessage":
        return <Message content={messageContent} />;
  
      case "actionButton":
        return (
          <ActionButton
            label={messageContent}
            onClick={() => {
              console.log(messageContent);
            }}
          />
        );
  
      case "media":
        return <Media content={messageContent} />;
  
      case "link":
        return <Link content={messageContent} />;
  
      case "conditionalPath":
        return (
          <div>
            <Message content={messageContent} />
              {conditions &&
                conditions.map((condition, index) => {
                  const handleId = `condition-${parentId}-${id}-${index}`; // Ensure unique IDs for handles
                  return (
                    <div className="relative flex items-center justify-end gap-2 w-full" key={handleId}>
                      <ActionButton
                        label={condition}
                        onClick={() => console.log(messageContent)}
                      />
                      <Handle
                        type="source"
                        position={Position.Right}
                        id={handleId}
                        isConnectable={isConnectable}
                      />
                    </div>
                  );
                })}
            
          </div>
        );
  
      default:
        return <Message content={messageContent} />;
    }
  };

  useEffect(() => {
    if (selected) {
      toggleForm(id);
    }
  }, [selected]);

  useEffect(() => {
    setContent(template ? template.content : []);
  }, [flow]);
const sourceHandleId = `source-${id}`
const targetHandleId = `target-${id}`

  return (
    <div className="min-w-[16rem] h-full p-4 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <div className="text-gray-200 text-lg font-semibold">Enter a new message</div>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        id={targetHandleId}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={sourceHandleId}
        isConnectable={isConnectable}
      />
      {!!content.length && (
        <div className="mt-3 bg-gray-700 rounded-lg shadow-md w-full p-2">
          {content.map((data, index) => (
            <div
              key={index}
              className="mb-3 p-2 border border-gray-600 rounded-md bg-gray-600"
            >
              {renderElement(data.type, data.content, data.conditions, String(index))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Scene;
