import networkx as nx
import matplotlib.pyplot as plt

G = nx.gnp_random_graph(10, 0.5)
print("Is the graph connected?", nx.is_connected(G))
print("Number of nodes:", G.number_of_nodes())
print("Number of edges:", G.number_of_edges())

# Visualize the graph
nx.draw(G, with_labels=True, node_color='lightblue', node_size=500, font_size=10)
plt.show()