import { ReactNode } from 'react';
import {Panel, PanelGroup, PanelResizeHandle} from 'react-resizable-panels'

interface ResizablePanelProps {
    defaultLayout?: number[] | undefined
    leftPanel: ReactNode,
    rightPanel: ReactNode,
    showLeftPanel: boolean
}

const ResizablePanel = ({defaultLayout=[33,67], leftPanel, rightPanel,showLeftPanel}:ResizablePanelProps)=>{
    const onLayout = (sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
    };


    return (
    <PanelGroup direction="horizontal" onLayout={onLayout} autoSaveId="condition" className='panel-group'>
        {showLeftPanel && (
        <>
            <Panel defaultSize={defaultLayout[0]} collapsible className=''>
            {leftPanel}
            </Panel>
            <PanelResizeHandle className="panel" />
        </>
        )}
        <Panel defaultSize={defaultLayout[1]}>{rightPanel}</Panel>
    </PanelGroup>
    );
};

    export default ResizablePanel;