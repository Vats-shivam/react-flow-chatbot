import React, { useEffect, useState } from 'react';
import { useSidebarContext } from '../context/SidebarContext';
import { Action } from '../types/action';
import { ITemplate } from '../types/template';
import { Button, Message, ActionButton, Media, Link } from './ChatBotUi';

const renderElement = (actionType: string, messageContent: string, conditions: string[] | undefined) => {
  switch (actionType) {
    case 'textMessage':
      return <Message content={messageContent} />;
      
    case 'actionButton':
      return <ActionButton label={messageContent} onClick={() => { console.log(messageContent); }} />;
      
    case 'media':
      return <Media content={messageContent} />;
      
    case 'link':
      return <Link content={messageContent} />;
    
    case 'conditionalPath':
      return (
        <div>
          <Message content={messageContent} />
          <div className="flex flex-col items-end">
            {conditions && conditions.map((condition, index) => (
              <ActionButton key={index} label={condition} onClick={() => console.log(messageContent)} />
            ))}
          </div>
        </div>
      );

    default:
      return <Message content={messageContent} />;
  }
};

const NodeBuilder: React.FC = () => {
  const { isVisible, setFlow, flow } = useSidebarContext();
  const [actionType, setActionType] = useState<string>('');
  const [messageContent, setMessageContent] = useState<string>('');
  const [actions, setActions] = useState<Action[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);

  useEffect(() => {
    if (flow.length) {
      const oldActions = flow.find((data) => data.id === isVisible);
      if (oldActions) {
        setActions([...oldActions.content]);
      } else {
        setActions([]);
      }
    }
  }, [isVisible]);

  const handleAddAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newAction: Action;
    if (actionType === 'conditionalPath') {
      newAction = {
        type: actionType,
        content: messageContent,
        conditions: conditions,
      };
    } else {
      newAction = {
        type: actionType,
        content: messageContent,
      };
    }

    setActions([...actions, newAction]);
    let newFlag=true;
    const updatedFlow: ITemplate[] = flow.map((data) => {
      if (data.id === isVisible) {
        data.content = [...actions, newAction];
        newFlag=false;
      }
      return data;
    });
    
    setFlow(newFlag?[...flow,{id:isVisible,content:[newAction]}]:updatedFlow);
    resetForm();
  };

  const resetForm = () => {
    setActionType('');
    setMessageContent('');
    setConditions([]);
  };

  return (
    <div className="w-full bg-gray-800 p-6 h-full text-white">
      <h1 className="text-lg font-bold">Add Action to WhatsApp Bot</h1>
      <form onSubmit={handleAddAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Select Action Type:</label>
          <select
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
            className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-white"
          >
            <option value="">-- Select an Action --</option>
            <option value="message">Send Message</option>
            <option value="link">Send Link</option>
            <option value="conditionalPath">Conditional Path</option>
            <option value="media">Send Media</option>
            <option value="actionButton">Add Action Button</option>
          </select>
        </div>

        {actionType && actionType !== "conditionalPath" ? (
          <div>
            <label className="block text-sm font-medium">Message:</label>
            <input
              type="text"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-white"
              required
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium">Message:</label>
            <input
              type="text"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-white"
              required
            />
            <button
              type="button"
              onClick={() => setConditions((prev) => [...prev, ''])}
              className="mt-2 text-blue-400 hover:underline"
            >
              Add Condition
            </button>
            {conditions.map((condition, index) => (
              <input
                key={index}
                type="text"
                value={condition}
                onChange={(e) => {
                  const updatedConditions = [...conditions];
                  updatedConditions[index] = e.target.value;
                  setConditions(updatedConditions);
                }}
                className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-white"
                required
              />
            ))}
          </div>
        )}

        <Button type="submit" variant="primary" className="bg-blue-600 hover:bg-blue-500 text-white">
          Add Action
        </Button>
      </form>

      <h2 className="mt-6 text-lg font-bold">Defined Actions:</h2>
      <div className="mt-4 bg-gray-700 rounded-lg shadow-md p-4 text-black">
        {actions.map((action, index) => (
          <div key={index} className="mb-4 p-2 border border-gray-600 rounded-md bg-gray-600">
            {renderElement(action.type, action.content, action.conditions)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeBuilder;
