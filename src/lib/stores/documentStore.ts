import { create } from 'zustand';
import { Document } from '@lib/types/document';

interface DocumentState {
  documents: Document[];
  addDocument: (doc: Document) => void;
  setDocuments: (docs: Document[]) => void;
}

const useDocumentStore = create<DocumentState>((set) => ({
  documents: [],
  addDocument: (doc) =>
    set((state) => ({ documents: [...state.documents, doc] })),
  setDocuments: (docs) => set({ documents: docs }),
}));

export default useDocumentStore;
