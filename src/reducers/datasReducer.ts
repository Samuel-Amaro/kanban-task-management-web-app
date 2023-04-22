import { Board } from "../data";

export type ActionTypeDatasReducer = 
    {type: "save_new_board", board: Board} 
    | {type: "edit_board", board: Board} 
    | { type: "delete_board"; idBoard: string }
    | {type: "changed_status_subtask"; idBoard: string; idColumn: string; idTask: string; idSubtask: string; newStatusSubtask: boolean};

export function datasReducer(/*datas*/draft: Board[], action: ActionTypeDatasReducer) {
    switch(action.type) {
        case "save_new_board": {
            /*return [
                ...datas,
                action.board
            ];*/
            draft.push(action.board);
            break;
        };
        case "edit_board": {
            /*return datas.map((b) => {
                if(b.id === action.board.id) {
                    return action.board;
                }
                return b;
            });
            */
           const indexBoardChanged = draft.findIndex((board) => board.id === action.board.id); 
           if(indexBoardChanged > -1) {
            draft.splice(indexBoardChanged, 1, action.board);
           }
           break;
        };
        case "delete_board": {
            /*return datas.filter((b) => {
                return b.id !== action.idBoard
            });
            */
            const indexBoardToBeDeleted = draft.findIndex((board) => board.id === action.idBoard);
            if(indexBoardToBeDeleted > -1) {
                draft.splice(indexBoardToBeDeleted, 1);
            }
            break;
        };
        /*case "changed_status_subtask": {
            //TODO: atualiza status propriedade de uma subtask
            //TODO: TENTAR COM ATUALIZAÇÃO DE STATE ANINHADO, DEPOIS REFATORAR PARA USAR IMMER IMUTAVEL
            //TODO: usar immer para reducer 
        };*/
        default: {
            throw Error("Unknown action datas");
        }
    }
}

/*
//!OBS: ATUALIZAÇÃO ANINHADA DO STATE
const boardIndex = datas.findIndex((board) => board.id === action.idBoard);
const columnIndex = datas[boardIndex].columns.findIndex((column) => column.id === action.idColumn);
const taskIndex = datas[boardIndex].columns[columnIndex].tasks.findIndex((task) => task.id === action.idTask);
const subtaskIndex = datas[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks.findIndex((subtask) => subtask.id === action.idSubtask);
console.log(boardIndex);
const boardModifier = {
    ...datas[boardIndex],
    columns: [
    //Itens antes do ponto de inserção:
    ...datas[boardIndex].columns.slice(0, columnIndex),
    {
        ...datas[boardIndex].columns[columnIndex],
        tasks: [
        ...datas[boardIndex].columns[columnIndex].tasks.slice(0, taskIndex),
        {
            ...datas[boardIndex].columns[columnIndex].tasks[taskIndex],
            subtasks: [
            ...datas[boardIndex].columns[columnIndex].tasks[
                taskIndex
            ].subtasks.slice(0, subtaskIndex),
            {
                ...datas[boardIndex].columns[columnIndex].tasks[taskIndex]
                .subtasks[subtaskIndex],
                isCompleted: action.newStatusSubtask,
            },
            ...datas[boardIndex].columns[columnIndex].tasks[
                taskIndex
            ].subtasks.slice(subtaskIndex),
            //subtask
            ],
        },
        ...datas[boardIndex].columns[columnIndex].tasks.slice(taskIndex),
        //task
        ],
    },
    ...datas[boardIndex].columns.slice(columnIndex),
    //column
    ],
}; //board
console.log(datas);
console.log(boardModifier);
const copyDatas = [...datas.slice(0, boardIndex), boardModifier, ...datas.slice(boardIndex)];
return copyDatas;
*/