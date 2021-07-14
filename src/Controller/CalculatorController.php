<?php

namespace App\Controller;

use App\Managers\CalculatorManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CalculatorController extends AbstractController
{
    #[Route('/', name: 'calculator', methods:['GET'])]
    public function index(): Response
    {
        return $this->render('calculator/index.html.twig', [
            'controller_name' => 'CalculatorController',
        ]);
    }

    /**
     * responsible of calculate the input provided
     * @param Request $request
     * @param CalculatorManager $calculatorManager
     * @return Response
     */
    #[Route('/api/calculate', name: 'calculate', methods:['POST'])]
    public function calculate(Request $request, CalculatorManager $calculatorManager): Response
    {
        $data = $request->getContent();
        $data = json_decode($data);
        if ($data->input) {
            return new JsonResponse(
                ['result' => $calculatorManager->calculateWithArrayReduce($data->input)],
                Response::HTTP_OK
            );
        }
        return new JsonResponse(
            ['error' => 'Not match'],
            Response::HTTP_BAD_REQUEST
        );
    }
}
