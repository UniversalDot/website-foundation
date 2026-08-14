const MapfArticleContent = () => {
  return (
    <div className="space-y-6 font-['Source_Serif_4',Georgia,serif] text-lg leading-[1.8] text-gray-800">
      <h3 className="text-2xl font-bold text-gray-900">4.1 PROBLEM STATEMENT</h3>

      <p>
        Modern fulfillment centers and automated warehouses are increasingly structured as large, grid-based environments. In this model, the warehouse floor is discretized into a grid of cells, with Autonomous Mobile Robots (AMRs) navigating this grid to perform logistics operations. These operations are dynamic, with a central fleet manager assigning tasks—such as moving from a storage area to a picking station—to individual AMRs in real-time.
      </p>

      <p>
        The core challenge in this domain is multi-agent coordination. While classic pathfinding algorithms like A* are highly effective for a single agent in a static environment, their fundamental assumptions break down in a dynamic, multi-robot world. An A* plan is computed assuming all obstacles are fixed; in a warehouse, other robots are mobile, dynamic obstacles, rendering a simple A* plan obsolete and leading to collisions or gridlock.
      </p>

      <p>
        This limitation necessitates a more robust solution, which is formally known as the Multi-Agent Path Finding (MAPF) problem. The objective of MAPF is to compute a set of collision-free paths for multiple agents, moving them from their respective starting locations to their goal locations. The challenge is not just to prevent collisions, but to do so efficiently, typically by minimizing a global cost function such as the sum of all agents' travel times.
      </p>

      <p>
        This problem is computationally demanding. Finding a provably optimal solution for MAPF is NP-hard, making it computationally intractable for the large-scale, real-time demands of a modern warehouse, which may feature hundreds or even thousands of AMRs. This project, therefore, addresses the critical need for a pathfinding system that is:
      </p>

      <ul className="list-disc space-y-2 pl-6">
        <li>
          <span className="font-semibold">Scalable:</span> Capable of handling a large fleet of agents simultaneously.
        </li>
        <li>
          <span className="font-semibold">Fast:</span> Able to compute solutions in real-time to respond to dynamic task assignments.
        </li>
        <li>
          <span className="font-semibold">Robust & Complete:</span> Guarantees finding a collision-free solution if one exists.
        </li>
        <li>
          <span className="font-semibold">High-Quality:</span> Produces efficient, near-optimal paths to maintain high throughput.
        </li>
      </ul>

      <h3 className="mt-10 text-2xl font-bold text-gray-900">4.2 PROPOSED SOLUTION</h3>

      <p>
        After a thorough investigation of existing MAPF algorithms—ranging from optimal but slow methods like Conflict-Based Search (CBS) to bounded-suboptimal approaches like EECBS and fast repair-based methods like LNS2—we have selected and implemented a solution based on the LaCAM (Lazy Constraints Addition Search for MAPF) algorithm.
      </p>

      <p>
        This algorithm, implemented in our project as LaCAM2, was chosen because it uniquely satisfies all the requirements of our problem statement. Research has shown it to be a complete algorithm that is also exceptionally fast and scalable, capable of solving instances with thousands of agents in seconds—a performance level that dramatically outperforms prior methods.
      </p>

      <h4 className="mt-6 text-xl font-semibold text-gray-900">4.2.1 Core Algorithm: LaCAM2</h4>

      <p>
        The power of LaCAM2 comes from its novel two-level search mechanism, which avoids the combinatorial explosion of traditional planners. Instead of planning complete paths, it intelligently plans a single, conflict-free step for all agents at once.
      </p>

      <ul className="list-decimal space-y-4 pl-6">
        <li>
          <span className="font-semibold">Two-Level Search:</span> The algorithm operates on two nested levels.
          <ul className="list-disc space-y-2 pl-6 mt-2">
            <li>
              <span className="font-semibold">High-Level Search:</span> This is a search over configurations. A configuration is a "snapshot" of the entire system, representing the precise location and orientation of every agent at a single point in time. Our system implements this as a Depth-First Search (DFS) using a stack of high-level nodes.
            </li>
            <li>
              <span className="font-semibold">Low-Level Search:</span> For each configuration, a low-level search (a Breadth-First Search) is performed to find the next configuration. This search lazily generates a minimal set of constraints (e.g., "Agent 5 must move to cell X") just for the next immediate timestep. This "lazy" approach is the key to its speed, as it avoids the massive search space of full-path planning.
            </li>
          </ul>
        </li>
        <li>
          <span className="font-semibold">Heuristic-Guided Configuration Generation:</span> To generate the next conflict-free configuration, the algorithm uses another fast, rule-based planner as a powerful heuristic. Our implementation uses PIBT (Priority Inheritance with Backtracking) for this purpose. After the low-level search provides constraints for a few agents, PIBT is used to rapidly find valid, conflict-free moves for all remaining agents, resulting in a complete and valid next-step configuration.
        </li>
      </ul>

      <h4 className="mt-6 text-xl font-semibold text-gray-900">4.2.2 System Architecture: Sorting Fleet Manager</h4>

      <p>
        The LaCAM2 algorithm is integrated as the core planning engine within a complete, lifelong logistics system named the "Sorting Fleet Manager".
      </p>

      <ul className="list-disc space-y-2 pl-6">
        <li>
          <span className="font-semibold">Server-Client Model:</span> The architecture consists of a central MAPF Server that holds the map state and runs the LaCAM2 planner. The AMRs (robots) act as clients, receiving commands and executing them. This decouples the heavy computational load from the individual agents.
        </li>
        <li>
          <span className="font-semibold">Lifelong & Dynamic Planning:</span> The system is designed for continuous, "lifelong" operation, not just a single-shot problem. The planner computes paths for a specified planning window. The system executes these plans, and as the agents approach the end of their planned paths, a replan flag is set. This triggers the planner to compute the next batch of actions from the agents' new positions, allowing for continuous, seamless operation.
        </li>
        <li>
          <span className="font-semibold">Dynamic Task Assignment:</span> The MAPF Server exposes an API, including an <code>/add_task</code> endpoint, to handle new tasks dynamically. As described in our use case, an external system (like a QR code scanner) can send a new start and goal location to the server. The server's <code>update_tasks</code> function then assigns this task to the next available agent, and the LaCAM2 planner incorporates this new goal in its next planning cycle.
        </li>
        <li>
          <span className="font-semibold">Real-World Awareness:</span> The planner is not a simple grid solver. It fully models the state of an AMR, including its orientation. It uses a pre-computed Heuristic Table (HT) to accurately estimate distances, and its action model includes rotational actions (Clockwise and Counter-Clockwise Rotate) alongside forward movement and waiting.
        </li>
      </ul>

      <h3 className="mt-10 text-2xl font-bold text-gray-900">4.3 CONTRIBUTIONS</h3>

      <p>
        This project's primary contribution is the design, implementation, and integration of a scalable, high-performance Smart Pathfinding System tailored for dynamic multi-agent warehouse logistics.
      </p>

      <p>The specific contributions are:</p>

      <ul className="list-decimal space-y-4 pl-6">
        <li>
          <span className="font-semibold">State-of-the-Art Algorithm Implementation:</span> We conducted a comparative analysis of modern MAPF algorithms and selected LaCAM as the most suitable for our large-scale, real-time requirements. We successfully implemented a C++ version, LaCAM2, as the core planning engine, leveraging its novel lazy-constraint and configuration-search approach.
        </li>
        <li>
          <span className="font-semibold">Robust Client-Server Architecture:</span> We developed a complete "Sorting Fleet Manager" application built on a server-client model. This architecture provides a scalable framework where a central server performs all computationally intensive planning, while lightweight clients (AMRs) simply execute the provided paths.
        </li>
        <li>
          <span className="font-semibold">Lifelong, Dynamic Tasking System:</span> We have successfully extended the classic, static MAPF problem into a continuous, "lifelong" solution. Our system can accept new tasks dynamically via an API endpoint (<code>/add_task</code>) at any time. These tasks are queued and assigned to available agents, and the LaCAM2 planner seamlessly integrates them into the next planning cycle, all while the fleet is in motion.
        </li>
        <li>
          <span className="font-semibold">Practical, High-Fidelity Modeling:</span> The system is built for a realistic use case, not a simplified academic problem.
          <ul className="list-disc space-y-2 pl-6 mt-2">
            <li>
              <span className="font-semibold">Full Rotational Awareness:</span> The planner and action model fully account for agent orientation and the time-cost of rotation, which is critical for real-world robots.
            </li>
            <li>
              <span className="font-semibold">Configurable Heuristics:</span> The planner's performance is optimized using a pre-computed Heuristic Table (HT) to guide the search.
            </li>
            <li>
              <span className="font-semibold">Visualization:</span> A dedicated visualization tool is included to monitor and debug fleet movements in real-time, providing clear insight into the planner's behavior.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default MapfArticleContent;
