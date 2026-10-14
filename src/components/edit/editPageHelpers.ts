// export function useAnnotationsState() {
//     const [annotations, setAnnotations] = React.useState<Annotation[]>(annotationsList);
//     const [isViewingAnnotations, setIsViewingAnnotations] =
//         React.useState<boolean>(true);
//     const [isAddingModeOn, setIsAddingModeOn] = React.useState<boolean>(false);
    
//     return {
//         toggleAddingMode: () => setIsAddingModeOn((prev) => !prev),
//         toggleAnnotationsView: () => setIsViewingAnnotations((prev) => !prev),
//         moveAnnotation: (id: string, position: AnnotationPosition) => {
//             setAnnotations((prev) =>
//               prev.map((annotation) =>
//                 annotation.id === id ? { ...annotation, position } : annotation,
//               ),
//             );
//         },
//         addAnnotation: 
//     }
// }

