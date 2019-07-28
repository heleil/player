package me.gacl.websocket;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;
import org.eclipse.paho.client.mqttv3.MqttTopic;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

//服务器端(tcp)
public class Server {

	/*public static void main(String[] args) throws Exception {
		//创建ServerSocket（服务器）对象
		ServerSocket ss=new ServerSocket(8888);
		//等待客户端发起请求
		Socket socket= ss.accept();
		//获取输入流
		InputStream is= socket.getInputStream();
		//字符流读取数据
		BufferedReader br=new BufferedReader(new InputStreamReader(is));
		String str=br.readLine();
		while(str!=null){
			System.out.println("服务器:"+str);
			str=br.readLine();
		}
		
		is.close();
		br.close();
		socket.close();
		ss.close();
		
	}*/
	 //tcp://MQTT安装的服务器地址:MQTT定义的端口号
    public static final String HOST = "tcp://58.87.105.241:61613";
    //定义一个主题
    public static final String TOPIC = "huhy";
    //定义MQTT的ID，可以在MQTT服务配置中指定
    private static final String clientid = "server";

    private MqttClient client;
    private MqttTopic topic11;
    private String userName = "admin";  //非必须
    private String passWord = "password";  //非必须

    private MqttMessage message;

    /**
     * 构造函数
     * @throws MqttException
     */
    public Server() throws MqttException {
        // MemoryPersistence设置clientid的保存形式，默认为以内存保存
        client = new MqttClient(HOST, clientid, new MemoryPersistence());
        connect();
    }

    /**
     *  用来连接服务器
     */
    private void connect() {
        MqttConnectOptions options = new MqttConnectOptions();
        options.setCleanSession(false);
        options.setUserName(userName);
        options.setPassword(passWord.toCharArray());
        // 设置超时时间
        options.setConnectionTimeout(10);
        // 设置会话心跳时间
        options.setKeepAliveInterval(20);
        try {
            client.setCallback(new PushCallback());
            client.connect(options);

            topic11 = client.getTopic(TOPIC);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     *
     * @param topic
     * @param message
     * @throws MqttPersistenceException
     * @throws MqttException
     */
    public void publish(MqttTopic topic , MqttMessage message) throws MqttPersistenceException,
            MqttException {
        MqttDeliveryToken token = topic.publish(message);
        token.waitForCompletion();
        System.out.println("message is published completely! "
                                   + token.isComplete());
    }

    /**
     *  启动入口
     * @param args
     * @throws MqttException
     */
    public static void main(String[] args) throws MqttException, InterruptedException {
        Server server = new Server();
        server.message = new MqttMessage();
        server.message.setQos(1);  //保证消息能到达一次
        server.message.setRetained(true);
        server.message.setPayload("abcde1".getBytes());
        server.publish(server.topic11 , server.message);
        Thread.sleep(2000);
        server.message.setPayload("abcde2".getBytes());
        server.publish(server.topic11 , server.message);
        Thread.sleep(2000);
        server.message.setPayload("abcde3".getBytes());
        server.publish(server.topic11 , server.message);
        System.out.println(server.message.isRetained() + "------ratained状态");
    }

}
