import {
  BookOpen,
  Code2,
  ContactRound,
  Database,
  Film,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  Network,
  ShoppingBag,
  Table2,
  Terminal,
  Users,
  Zap,
} from "lucide-react";

/** Decorative interpretations of the projects, not screenshots or live demos. */
export default function ProjectVisual({ kind }: { kind: string }) {
  if (kind === "java") {
    return (
      <div className="java-visual" aria-hidden="true">
        <div className="terminal-top">
          <div className="terminal-dots">
            <i />
            <i />
            <i />
          </div>
          <span>
            <Terminal size={12} /> management.java
          </span>
          <Code2 size={13} />
        </div>
        <div className="terminal-code">
          <div>
            <span className="line-number">01</span>
            <span className="code-muted">
              // Cinco ideas. Un mismo lenguaje.
            </span>
          </div>
          <div>
            <span className="line-number">02</span>
            <span>
              <b>public class</b> <em>Management</em> {"{"}
            </span>
          </div>
          <div>
            <span className="line-number">03</span>
            <span>
              &nbsp;&nbsp;<b>String[]</b> systems = {"{"}
            </span>
          </div>
          <div>
            <span className="line-number">04</span>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;<q>banca</q>, <q>academia</q>,
            </span>
          </div>
          <div>
            <span className="line-number">05</span>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;<q>tienda</q>, <q>agenda</q>, <q>notas</q>
            </span>
          </div>
          <div>
            <span className="line-number">06</span>
            <span>&nbsp;&nbsp;{"};"}</span>
          </div>
          <div>
            <span className="line-number">07</span>
            <span>
              {"}"}
              <i className="terminal-cursor" />
            </span>
          </div>
        </div>
        <div className="system-nodes">
          <span>
            <Landmark size={16} /> Banca
          </span>
          <span>
            <GraduationCap size={16} /> Academia
          </span>
          <span>
            <ShoppingBag size={16} /> Tienda
          </span>
          <span>
            <ContactRound size={16} /> Agenda
          </span>
          <span>
            <BookOpen size={16} /> Notas
          </span>
        </div>
        <span className="visual-caption">EXPLORACIÓN VISUAL · 5 MÓDULOS</span>
      </div>
    );
  }

  if (kind === "n8n") {
    return (
      <div className="workflow-visual" aria-hidden="true">
        <div className="flow-orbit" />
        <div className="flow-orbit flow-orbit-inner" />
        <div className="flow-line flow-line-left" />
        <div className="flow-line flow-line-top" />
        <div className="flow-line flow-line-bottom" />
        <div className="flow-node flow-input">
          <Zap size={22} />
          <span>WEBHOOK</span>
        </div>
        <div className="flow-node core">
          <Network size={33} />
          <strong>n8n</strong>
          <span>CLASIFICAR</span>
        </div>
        <div className="flow-node flow-database">
          <Database size={24} />
          <span>POSTGRESQL</span>
        </div>
        <div className="flow-node flow-sheet">
          <Table2 size={23} />
          <span>GOOGLE SHEETS</span>
        </div>
        <span className="visual-caption">
          EXPLORACIÓN VISUAL · DATOS EN MOVIMIENTO
        </span>
      </div>
    );
  }

  if (kind === "acme") {
    return (
      <div className="school-visual" aria-hidden="true">
        <div className="school-window">
          <div className="school-bar">
            <GraduationCap size={18} />
            <strong>acme.</strong>
            <span>Workspace</span>
            <i />
          </div>
          <div className="school-columns">
            <div className="school-sidebar">
              <LayoutDashboard size={15} />
              <Users size={15} />
              <BookOpen size={15} />
              <i />
            </div>
            <div className="school-content">
              <div className="school-heading">
                <span>Directorio de usuarios</span>
                <i>＋</i>
              </div>
              <div className="school-table-head">
                <span>USUARIO</span>
                <span>ROL</span>
              </div>
              <div className="school-rows">
                <div>
                  <i>AD</i>
                  <span>
                    <b />
                    <small />
                  </span>
                  <em>Admin</em>
                </div>
                <div>
                  <i>DO</i>
                  <span>
                    <b />
                    <small />
                  </span>
                  <em>Docente</em>
                </div>
                <div>
                  <i>DO</i>
                  <span>
                    <b />
                    <small />
                  </span>
                  <em>Docente</em>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="visual-caption">
          EXPLORACIÓN VISUAL · GESTIÓN DE USUARIOS
        </span>
      </div>
    );
  }

  return (
    <div className="cinema-visual" aria-hidden="true">
      <div className="cinema-glow" />
      <div className="movie-poster movie-one">
        <div className="poster-orbit" />
        <span>
          UNIVERSOS
          <br />
          <strong>POR DESCUBRIR</strong>
        </span>
        <small>EXPLORACIÓN VISUAL</small>
      </div>
      <div className="movie-poster movie-two">
        <div className="poster-sun" />
        <span>
          LA PRÓXIMA
          <br />
          <strong>HISTORIA</strong>
        </span>
        <small>EXPLORACIÓN VISUAL</small>
      </div>
      <div className="cinema-caption">
        <Film size={16} />
        <span>Una ventana a otras historias.</span>
      </div>
    </div>
  );
}
